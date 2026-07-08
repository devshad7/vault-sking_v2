"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";

import {
  Address,
  deleteAddress,
  listenAddresses,
  saveAddress,
  setDefaultAddress,
  updateAddress,
} from "@/lib/addressService";

export const useAddresses = () => {
  const { user } = useUser();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenAddresses(user.id, (data) => {
      setAddresses(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addAddress = async (address: Omit<Address, "id">) => {
    if (!user) throw new Error("User not authenticated");
    await saveAddress(user.id, address);
  };

  const editAddress = async (addressId: string, address: Partial<Address>) => {
    if (!user) throw new Error("User not authenticated");
    await updateAddress(user.id, addressId, address);
  };

  const removeAddress = async (addressId: string) => {
    if (!user) throw new Error("User not authenticated");
    await deleteAddress(user.id, addressId);
  };

  const makeDefault = async (addressId: string) => {
    if (!user) throw new Error("User not authenticated");
    await setDefaultAddress(user.id, addressId);
  };

  const defaultAddress = useMemo(
    () => addresses.find((a) => a.isDefault),
    [addresses],
  );

  return {
    addresses,
    defaultAddress,
    loading,
    addAddress,
    editAddress,
    removeAddress,
    makeDefault,
  };
};
