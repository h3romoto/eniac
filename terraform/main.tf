terraform {
    required_version = ">= 0.13"
    required_providers {
      libvirt = {
        source  = "dmacvicar/libvirt"
      }
    }
}

provider "libvirt" {
  # connection URI to local emulator ("hypervisor")
  uri = "qemu:///system"
}

# an example from dev.to
resource "libvirt_pool" "unix" {
  name = "unix"
  type = "dir"
  path = var.libvirt_disk_path
}

resource "libvirt_volume" "unix-qcow2" {
  name = "unix-qcow2"
  pool = libvirt_pool.unix.name
  source = var.unix_18_img_url
  format = "qcow2"
}

data "template_file" "user_data" {
  template = file("${path.module}/config/cloud_init.yml")
}

data "template_file" "network_config" {
  template = file("${path.module}/config/network_config.yml")
}

resource "libvirt_cloudinit_disk" "commoninit" {
  name           = "commoninit.iso"
  user_data      = data.template_file.user_data.rendered
  network_config = data.template_file.network_config.rendered
  pool           = libvirt_pool.unix.name
}

resource "libvirt_domain" "domain-unix" {
  name   = var.vm_hostname
  memory = "512"
  vcpu   = 1

  cloudinit = libvirt_cloudinit_disk.commoninit.id

  network_interface {
    network_name   = "default"
    wait_for_lease = true
    hostname       = var.vm_hostname
  }

  console {
    type        = "pty"
    target_port = "0"
    target_type = "serial"
  }

  console {
    type        = "pty"
    target_type = "virtio"
    target_port = "1"
  }

  disk {
    volume_id = libvirt_volume.unix-qcow2.id
  }

  graphics {
    type        = "spice"
    listen_type = "address"
    autoport    = true
  }

  provisioner "remote-exec" {
    inline = [
      "echo 'Hello World'"
    ]

    connection {
      type                = "ssh"
      user                = var.ssh_username
      host                = libvirt_domain.domain-unix.network_interface[0].addresses[0]
      private_key         = file(var.ssh_private_key)
      bastion_host        = "ams-kvm-remote-host"
      bastion_user        = "deploys"
      timeout             = "2m"
    }
  }

  provisioner "local-exec" {
    command = <<EOT
      echo "[nginx]" > nginx.ini
      echo "${libvirt_domain.domain-unix.network_interface[0].addresses[0]}" >> nginx.ini
      echo "[nginx:vars]" >> nginx.ini
      echo "ansible_ssh_common_args='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand=\"ssh -W %h:%p -q ams-kvm-remote-host\"'" >> nginx.ini
      ansible-playbook -u ${var.ssh_username} --private-key ${var.ssh_private_key} -i nginx.ini ansible/playbook.yml
      EOT
  }
}