export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status?: string;
    provider?: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <div className="mt-6 grow sm:mt-8 lg:mt-0 ">
        <div className="space-y-4 rounded-lg border border-gray-100 bg-gradient-to-r from-slate-100 via-white to-slate-100 p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-2">
            <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-white sm:text-2xl text-center">
              Recently Credited
            </h2>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700"></dl>
            <h1 className="text-2xl text-center font-semibold antialiased">
              No Recent Transactions
            </h1>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-8">
          <img
            className="h-8 w-auto dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
            alt=""
          />
          <img
            className="hidden h-8 w-auto dark:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
            alt=""
          />
          <img
            className="h-8 w-auto dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
            alt=""
          />
          <img
            className="hidden h-8 w-auto dark:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
            alt=""
          />
          <img
            className="h-8 w-auto dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
            alt=""
          />
          <img
            className="hidden h-8 w-auto dark:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
            alt=""
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="mt-6 grow sm:mt-8 lg:mt-0">
        <div className="space-y-4 rounded-lg border border-gray-100 bg-gradient-to-r from-slate-100 via-white to-slate-100 p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-2">
            <h2 className="text-xl mb-4 font-semibold text-gray-900 dark:text-white sm:text-2xl text-center">
              Recently Credited
            </h2>
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700"></dl>

            {transactions.map((t: any) => (
              <dl className="flex  justify-between space-x-7 md:space-x-5">
                <dt className="text-base font-normal text-gray-500 ">
                  Credited INR
                </dt>
                <dt className="text-base font-normal text-gray-500 flex-1">
                  {t.time.toDateString()}
                </dt>
                <dd className="text-base font-medium text-green-500 ">
                  {`₹ ${new Intl.NumberFormat("en-IN").format(t.amount / 100)}`}
                </dd>
              </dl>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-8">
          <img
            className="h-8 w-auto dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
            alt=""
          />
          <img
            className="hidden h-8 w-auto dark:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
            alt=""
          />
          <img
            className="h-8 w-auto dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
            alt=""
          />
          <img
            className="hidden h-8 w-auto dark:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
            alt=""
          />
          <img
            className="h-8 w-auto dark:hidden"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
            alt=""
          />
          <img
            className="hidden h-8 w-auto dark:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};
