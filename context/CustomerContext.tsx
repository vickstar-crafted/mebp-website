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
  school?: string;
  address?: string;
};

type CustomerContextType = {
  customer: Customer;
  errors: CustomerErrors;

  updateCustomer: (
    data: Partial<Customer>
  ) => void;

  validateCustomer: () => boolean;

  normalizePhoneNumber: (
    phone: string
  ) => string;

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
  const [customer, setCustomer] =
    useState<Customer>({
      name: "",
      phone: "",
      school: "",
      address: "",
    });

  const [errors, setErrors] =
    useState<CustomerErrors>({});

  /*
    LOAD CUSTOMER DETAILS
    FROM LOCAL STORAGE
  */

  useEffect(() => {
    const savedCustomer =
      localStorage.getItem("mebp-customer");

    if (savedCustomer) {
      try {
        setCustomer(JSON.parse(savedCustomer));
      } catch (error) {
        console.error(
          "Failed to load customer details:",
          error
        );

        localStorage.removeItem(
          "mebp-customer"
        );
      }
    }
  }, []);

  /*
    SAVE CUSTOMER DETAILS
    TO LOCAL STORAGE
  */

  useEffect(() => {
    localStorage.setItem(
      "mebp-customer",
      JSON.stringify(customer)
    );
  }, [customer]);

  /*
    UPDATE CUSTOMER DETAILS
  */

  function updateCustomer(
    data: Partial<Customer>
  ) {
    setCustomer((prev) => ({
      ...prev,
      ...data,
    }));

    /*
      Remove the relevant validation error
      when the customer starts editing
    */

    setErrors((prev) => ({
      ...prev,

      ...(data.name !== undefined && {
        name: undefined,
      }),

      ...(data.phone !== undefined && {
        phone: undefined,
      }),

      ...(data.school !== undefined && {
        school: undefined,
      }),

      ...(data.address !== undefined && {
        address: undefined,
      }),
    }));
  }

  /*
    PHONE NUMBER NORMALIZATION

    Removes formatting characters such as:

    Spaces
    Hyphens
    Parentheses
    Dots

    Examples:

    +1 (415) 555-2671
    becomes
    +14155552671

    +44 7911 123456
    becomes
    +447911123456

    0803 396 1238
    becomes
    08033961238
  */

  function normalizePhoneNumber(
    phone: string
  ) {
    const trimmedPhone =
      phone.trim();

    const cleaned =
      trimmedPhone.replace(
        /[\s().-]/g,
        ""
      );

    return cleaned;
  }

  /*
    VALIDATE CUSTOMER DETAILS
  */

  function validateCustomer() {
    const newErrors: CustomerErrors = {};

    const name =
      customer.name.trim();

    const phone =
      customer.phone.trim();

    const school =
      customer.school.trim();

    const address =
      customer.address.trim();

    /*
      FULL NAME VALIDATION

      Examples accepted:

      John Doe
      Mary-Anne Smith
      O'Connor James

      Examples rejected:

      hello123
      12345
      John123
      $
      John
    */

    const namePattern =
      /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;

    if (!name) {
      newErrors.name =
        "Full name is required.";
    } else if (!namePattern.test(name)) {
      newErrors.name =
        "Please enter your first and last name using letters only.";
    }

    /*
      INTERNATIONAL PHONE NUMBER VALIDATION

      Examples accepted:

      08033961238
      0803 396 1238
      +2348033961238
      +44 7911 123456
      +447911123456
      +1 (415) 555-2671

      Examples rejected:

      hello123
      abcdef
      123
      +hello
    */

    const normalizedPhone =
      normalizePhoneNumber(phone);

    /*
      International phone number:

      Optional leading +

      Must contain digits only after
      the optional +

      Between 7 and 15 digits

      This follows the maximum length
      commonly used for international
      telephone numbers.
    */

    const phonePattern =
      /^\+?[0-9]{7,15}$/;

    if (!phone) {
      newErrors.phone =
        "Phone number is required.";
    } else if (
      !phonePattern.test(normalizedPhone)
    ) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    /*
      SCHOOL / ORGANISATION VALIDATION

      This field is optional.

      If entered, it must contain
      at least one letter.

      Examples accepted:

      Babcock University
      Model School
      School 1
      ABC Ltd.
      King's College

      Examples rejected:

      123456
      !!!!
      @@@@
    */

    const schoolPattern =
      /^(?=.*[A-Za-z])[A-Za-z0-9\s&.,'()-]+$/;

    if (
      school &&
      !schoolPattern.test(school)
    ) {
      newErrors.school =
        "Please enter a valid school or organisation name.";
    }

    /*
      DELIVERY ADDRESS VALIDATION
    */

    if (!address) {
      newErrors.address =
        "Delivery address is required.";
    } else if (address.length < 10) {
      newErrors.address =
        "Please enter a more complete delivery address.";
    }

    /*
      UPDATE VALIDATION ERRORS
    */

    setErrors(newErrors);

    /*
      RETURN TRUE ONLY WHEN
      THERE ARE NO ERRORS
    */

    return (
      Object.keys(newErrors).length === 0
    );
  }

  /*
    CLEAR CUSTOMER DETAILS
  */

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
        normalizePhoneNumber,
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