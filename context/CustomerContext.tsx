"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Customer = {
  name: string;
  phone: string;
  school: string;
  address: string;
};

type CustomerErrors = {
  name?: string;
  phone?: string;
};

type CustomerContextType = {
  customer: Customer;
  errors: CustomerErrors;

  updateCustomer: (data: Partial<Customer>) => void;

  validateCustomer: () => boolean;

  clearCustomer: () => void;
};

const CustomerContext =
  createContext<CustomerContextType | undefined>(
    undefined
  );

export function CustomerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    school: "",
    address: "",
  });

  const [errors, setErrors] =
    useState<CustomerErrors>({});

  useEffect(() => {
    const savedCustomer =
      localStorage.getItem("mebp-customer");

    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "mebp-customer",
      JSON.stringify(customer)
    );
  }, [customer]);

  function updateCustomer(
    data: Partial<Customer>
  ) {
    setCustomer((prev) => ({
      ...prev,
      ...data,
    }));

    // Remove the error for fields that are corrected
    setErrors((prev) => ({
      ...prev,
      ...(data.name !== undefined && {
        name: undefined,
      }),
      ...(data.phone !== undefined && {
        phone: undefined,
      }),
    }));
  }

  function validateCustomer() {
    const newErrors: CustomerErrors = {};

    if (!customer.name.trim()) {
      newErrors.name =
        "Full name is required.";
    }

    if (!customer.phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function clearCustomer() {
    setCustomer({
      name: "",
      phone: "",
      school: "",
      address: "",
    });

    setErrors({});

    localStorage.removeItem(
      "mebp-customer"
    );
  }
  

  return (
    <CustomerContext.Provider
      value={{
        customer,
        errors,
        updateCustomer,
        validateCustomer,
        clearCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context =
    useContext(CustomerContext);

  if (!context) {
    throw new Error(
      "useCustomer must be used within CustomerProvider"
    );
  }

  return context;
}