"use client";
import { useState } from "react";
import { Button } from "../@/shad/ui/button";

export function Transactions({ transactions }: { transactions: any }) {
  const { allTransactions, txns } = transactions;
  let [change, isChanged] = useState(false);
  return (
    <>
      <div className="text-4xl antialiased text-black text-center pt-8 mb-8 mt-4 md:mt-8 font-bold ml-4 mr-4">
        {change
          ? `Net Banking Transactions History`
          : `Peer to Peer Transactions History`}
      </div>
      <div className="flex justify-evenly">
        <Button
          className="bg-black w-fit hover:bg-gray-700 text-white text-md"
          onClick={() => isChanged(false)}
        >
          P2P transactions
        </Button>
        <Button
          className="bg-black w-fit hover:bg-gray-700 text-white text-md"
          onClick={() => isChanged(true)}
        >
          Net Banking
        </Button>
      </div>
      <div>
        {change ? (
          <NetBanking txns={txns}></NetBanking>
        ) : (
          <P2pTransactions allTransactions={allTransactions}></P2pTransactions>
        )}
      </div>
    </>
  );
}

export function P2pTransactions({ allTransactions }: { allTransactions: any }) {
  return (
    <>
      {allTransactions.length ? (
        <section className="bg-transparent antialiased dark:bg-gray-900 ">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <div className="mt-6 flow-root sm:mt-8">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {allTransactions.map((t: any) => (
                    <div className="flex flex-wrap items-center text-center md:text-start gap-y-4 py-6">
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          {t.type == "received" ? "from" : "to"}
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          <div className="hover:underline">{t.number}</div>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Name
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          <div className="hover:underline">{t.name}</div>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Date
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {`${new Date(t.time).getDate()} /
                          ${new Date(t.time).getMonth() + 1} /
                          ${new Date(t.time).getFullYear()}`}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Amount
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {t.type == "send" ? (
                            <span className="text-red-600">{`- ₹${new Intl.NumberFormat(
                              "en-IN"
                            ).format(t.amount / 100)}`}</span>
                          ) : (
                            <span className="text-green-600">{`+ ₹${new Intl.NumberFormat(
                              "en-IN"
                            ).format(t.amount / 100)}`}</span>
                          )}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        {t.type == "send" ? (
                          <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              width="24"
                              height="24"
                              className="me-1 h-3 w-3"
                            >
                              <path
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                              />
                            </svg>

                            {t.type}
                          </dd>
                        ) : (
                          <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="me-1 h-3 w-3"
                              width="24"
                              height="24"
                            >
                              <path
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                              />
                            </svg>

                            {t.type}
                          </dd>
                        )}
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                  You Have No P2P Transactions Yet
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Please Initiate any Transfer to view Details{" "}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

// need to add withdraw
export function NetBanking({ txns }: { txns: any }) {
  return (
    <>
      {txns.length ? (
        <section className="bg-transparent antialiased dark:bg-gray-900 ">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <div className="mt-6 flow-root sm:mt-8">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {txns.map((t: any) => (
                    <div className="flex flex-wrap items-center text-center md:text-start gap-y-4 py-6">
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Provider
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          <div className="hover:underline">{t.provider}</div>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Date
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {`${new Date(t.startTime).getDate()} /
                          ${new Date(t.startTime).getMonth() + 1} /
                          ${new Date(t.startTime).getFullYear()}`}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Amount
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {t.status == "Failure" ? (
                            <span className="text-red-600">{`₹${new Intl.NumberFormat(
                              "en-IN"
                            ).format(t.amount / 100)}`}</span>
                          ) : (
                            <span className="text-green-600">{`+ ₹${new Intl.NumberFormat(
                              "en-IN"
                            ).format(t.amount / 100)}`}</span>
                          )}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        {t.status == "Failure" ? (
                          <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                            {"Failed"}
                          </dd>
                        ) : (
                          <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="me-1 h-3 w-3"
                              width="24"
                              height="24"
                            >
                              <path
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                              />
                            </svg>

                            {"Credited"}
                          </dd>
                        )}
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                  You Have No Net Banking Transactions Yet
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Please Credit Money to Wallet to Proceed Further{" "}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
