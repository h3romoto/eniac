# Create a volume (virtual disk)
resource "libvirt_volume" "susan-qcow2" {
  name = "susan.qcow2"
  pool = "default"
  source = "https://cloud.centos.org/centos/7/images/CentOS-7-x86_64-GenericCloud.qcow2"
  format = "qcow2"
}

# Get user data info
data "template_file" "user_data" {
  template = "${file("${path.module}/cloud_init.cfg")}"
}

# Use CloudInit to add the instance
resource "libvirt_cloudinit_disk" "commoninit" {
  name = "commoninit.iso"
  pool = "default"
  user_data      = "${data.template_file.user_data.rendered}"
}

# Create the VM
resource "libvirt_domain" "susan" {
  name = "saai527-16"
  memory = "2048"
  vcpu   = 2

  network_interface {
    network_name = "default"
  }

  disk {
    volume_id = "${libvirt_volume.susan-qcow2.id}"
  }

  cloudinit = "${libvirt_cloudinit_disk.commoninit.id}"

  console {
    type = "pty"
    target_type = "serial"
    target_port = "0"
  }

  graphics {
    type = "spice"
    listen_type = "address"
    autoport = true
  }
}

# Print stuff on the terminal
output "ip" {
  value = "{libvirt_domain.susan.network_interface.0.addresses.0}"
}