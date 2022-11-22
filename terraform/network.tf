resource "libvirt_network" "cloud_network" {
  name = "cloud_network"
  # nat is the default mode
  mode      = "nat"
  domain    = "cloud.local"
  addresses = ["172.20.0.0/12"]

  dns {
    enabled = true
  }

}
