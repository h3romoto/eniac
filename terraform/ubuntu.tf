# # instance provider defined in main.tf 

# # create storage pool
# resource "libvirt_pool" "ubuntu" {
#   name = "ubuntu"
#   type = "dir"
#   path = "/tmp/libvirt/images/terraform-provider-libvirt-pool-ubuntu"
# }

# # fetch ubuntu qcow2 image
# resource "libvirt_volume" "ubuntu-qcow2" {
#   name   = "ubuntu-qcow2"
#   pool   = libvirt_pool.ubuntu.name
#   source = "https://cloud-images.ubuntu.com/bionic/current/bionic-server-cloudimg-s390x.img"
#   format = "qcow2"
# }

# data "template_file" "user_data" {
#   template = file("${path.module}/cloud_init.cfg")
# }

# # data "template_file" "network_config" {
# #   template = file("${path.module}/network_config.cfg")
# # }

# resource "libvirt_cloudinit_disk" "commoninit" {
#   name      = "commoninit.iso"
#   user_data = data.template_file.user_data.rendered
#   #   network_config = data.template_file.network_config.rendered
#   pool = libvirt_pool.ubuntu.name
# }

# # Create the machine
# resource "libvirt_domain" "domain-ubuntu" {
#   name   = "ubuntu-terraform"
#   memory = "1024"
#   vcpu   = 2

#   cloudinit = libvirt_cloudinit_disk.commoninit.id

#   network_interface {
#     # network_name   = "cloud_network"
#     network_id     = libvirt_network.cloud_network.id
#     wait_for_lease = true
#   }

#   console {
#     type        = "pty"
#     target_port = "0"
#     target_type = "serial"
#   }

#   console {
#     type        = "pty"
#     target_type = "virtio"
#     target_port = "1"
#   }

#   disk {
#     volume_id = libvirt_volume.ubuntu-qcow2.id
#   }

#   graphics {
#     type        = "spice"
#     listen_type = "address"
#     autoport    = true
#   }
# }

# terraform {
#   required_version = ">= 0.12"
# }

# # IPs: use wait_for_lease true or after creation use terraform refresh and terraform show for the ips of domain
