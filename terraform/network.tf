resource "libvirt_network" "cloud_network" {
  name = "local_cloud_net"
  mode   = "bridge"
  bridge = "br0"
}
