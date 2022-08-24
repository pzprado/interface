import { skipToken } from '@reduxjs/toolkit/dist/query'
import { TradeType } from '@uniswap/sdk-core'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DoubleCurrencyLogoWithTxStatus } from 'src/components/CurrencyLogo/LogoWithTxStatus'
import { PollingInterval } from 'src/constants/misc'
import { useSpotPricesQuery } from 'src/features/dataApi/slice'
import { createBalanceUpdate, getFormattedCurrencyAmount } from 'src/features/notifications/utils'
import { useCurrency } from 'src/features/tokens/useCurrency'
import TransactionSummaryLayout from 'src/features/transactions/SummaryCards/TransactionSummaryLayout'
import { BaseTransactionSummaryProps } from 'src/features/transactions/SummaryCards/TransactionSummaryRouter'
import { formatTitleWithStatus } from 'src/features/transactions/SummaryCards/utils'
import {
  ExactInputSwapTransactionInfo,
  ExactOutputSwapTransactionInfo,
  TransactionStatus,
  TransactionType,
} from 'src/features/transactions/types'
import { currencyAddress } from 'src/utils/currencyId'

export default function SwapSummaryItem({
  transaction,
  showInlineWarning,
  readonly,
  ...rest
}: BaseTransactionSummaryProps & {
  transaction: { typeInfo: ExactOutputSwapTransactionInfo | ExactInputSwapTransactionInfo }
}) {
  const { t } = useTranslation()
  const { status } = transaction

  const showCancelIcon =
    (status === TransactionStatus.Cancelled || status === TransactionStatus.Cancelling) &&
    showInlineWarning
  const inputCurrency = useCurrency(transaction.typeInfo.inputCurrencyId)
  const outputCurrency = useCurrency(transaction.typeInfo.outputCurrencyId)

  const [inputAmountRaw, outputAmountRaw] = useMemo(() => {
    if (transaction.typeInfo.tradeType === TradeType.EXACT_INPUT) {
      return [
        transaction.typeInfo.inputCurrencyAmountRaw,
        transaction.typeInfo.expectedOutputCurrencyAmountRaw,
      ]
    } else
      return [
        transaction.typeInfo.expectedInputCurrencyAmountRaw,
        transaction.typeInfo.outputCurrencyAmountRaw,
      ]
  }, [transaction.typeInfo])

  const caption = useMemo(() => {
    if (!inputCurrency || !outputCurrency) {
      return ''
    }
    if (status !== TransactionStatus.Success) {
      const currencyAmount = getFormattedCurrencyAmount(inputCurrency, inputAmountRaw)
      const otherCurrencyAmount = getFormattedCurrencyAmount(outputCurrency, outputAmountRaw)
      return `${currencyAmount} ${inputCurrency.symbol} → ${otherCurrencyAmount} ${outputCurrency.symbol}`
    }
    return inputCurrency.symbol + '→' + outputCurrency.symbol
  }, [inputAmountRaw, inputCurrency, outputAmountRaw, outputCurrency, status])

  const { currentData } = useSpotPricesQuery(
    outputCurrency
      ? {
          chainId: transaction.chainId,
          addresses: [currencyAddress(outputCurrency)],
        }
      : skipToken,
    // Covalent pricing endpoint only refreshes every 30 minutes
    { pollingInterval: PollingInterval.Slow }
  )

  const balanceUpdate = useMemo(() => {
    return outputAmountRaw
      ? createBalanceUpdate(
          TransactionType.Swap,
          status,
          outputCurrency,
          outputAmountRaw,
          currentData
        )
      : undefined
  }, [currentData, outputAmountRaw, outputCurrency, status])

  const title = formatTitleWithStatus({
    status: transaction.status,
    text: t('Swap'),
    showInlineWarning,
    t,
  })

  return (
    <TransactionSummaryLayout
      caption={caption}
      endCaption={balanceUpdate?.usdIncrease ?? ''}
      endTitle={balanceUpdate?.assetIncrease ?? ''}
      icon={
        <DoubleCurrencyLogoWithTxStatus
          currency={outputCurrency}
          otherCurrency={inputCurrency}
          showCancelIcon={showCancelIcon}
          status={transaction.status}
        />
      }
      readonly={readonly}
      showInlineWarning={showInlineWarning}
      title={title}
      transaction={transaction}
      {...rest}
    />
  )
}
