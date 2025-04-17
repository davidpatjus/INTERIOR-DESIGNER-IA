"use client";

import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { Users } from "@/db/schema";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function BuyCredits() {
  const [selectedCreditOption, setSelectedCreditOption] =
    useState<CreditOption | null>(null);

	const { userDetail, setUserDetail } = useContext(UserDetailContext)

	const router = useRouter()

  type CreditOption = {
    credits: number;
    price: number;
  };

  const creditsOptions: CreditOption[] = [
    {
      credits: 5,
      price: 1.99,
    },
    {
      credits: 10,
      price: 2.99,
    },
    // {
    //   credits: 15,
    //   price: 12900
    // },
    {
      credits: 20,
      price: 4.99,
    },
    // {
    //   credits: 25,
    //   price: 21900
    // },
    // {
    //   credits: 30,
    //   price: 24900
    // },
    {
      credits: 50,
      price: 9.99,
    },
    {
      credits: 100,
      price: 19.99,
    },
  ];

	const onPaymentSuccess = async () => {
		try {
			if (selectedCreditOption?.credits) {
				const result = await db.update(Users).set({
					credits: userDetail?.credits + selectedCreditOption?.credits,
		}).returning({ id: Users.id})

		if (result) {
					setUserDetail(prev => ({
						...prev,
						credits: prev.credits + selectedCreditOption?.credits
					}))
					router.push(`/dashboard`)
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

  return (
    <div>
      <h2 className="text-2xl font-bold">Comprar Créditos</h2>
      <p className="text-lg text-gray-500">
        Desbloquea posibilidades infinitas - Compra más créditos y transforma tu
        interior con la magia de la IA
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        {creditsOptions.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 justify-center items-center p-4 border-2 rounded-md ${
              selectedCreditOption?.credits === item.credits && "border-primary"
            }`}
          >
            <h2 className="font-bold text-3xl">{item.credits}</h2>
            <h2 className="font-medium text-xl">Créditos</h2>

            <Button
              className="w-full"
              onClick={() => setSelectedCreditOption(item)}
            >
              Comprar
            </Button>
            <h2 className="font-bold text-primary">
              ${item.price.toLocaleString("en-US")} USD
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-center items-center">
        {selectedCreditOption?.price ? (
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border-2 border-gray-100">
            <h3 className="text-xl font-bold text-center mb-4">Resumen de Compra</h3>
            <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded">
              <span className="text-gray-600">Total a Pagar:</span>
              <span className="text-xl font-bold text-primary">
                ${selectedCreditOption.price.toLocaleString("en-US")} USD
              </span>
            </div>
            <PayPalButtons 
              style={{ 
                layout: "vertical",
                shape: "pill",
                height: 55
              }}
							createOrder={(data, actions) => {
								return actions?.order.create({
									purchase_units: [
										{
											amount: {
												value: selectedCreditOption.price.toString(),
												currency_code: "USD"
											}
										}
									],
									intent: "CAPTURE"
								})
							}}
							onApprove={() => onPaymentSuccess()}
							onCancel={() => console.log('Payment cancelled')}
              className="w-full"
            />
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Selecciona un paquete de créditos para continuar con tu compra
          </p>
        )}
      </div>
    </div>
  );
}
