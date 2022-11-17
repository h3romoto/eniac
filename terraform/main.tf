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