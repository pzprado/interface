import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, LayoutRectangle } from 'react-native'
import { useAppTheme } from 'src/app/hooks'
import AlertTriangle from 'src/assets/icons/alert-triangle.svg'
import PasteButton from 'src/components/buttons/PasteButton'
import { TextInput } from 'src/components/input/TextInput'
import { Flex } from 'src/components/layout'
import { Text } from 'src/components/Text'
import { SectionName } from '../telemetry/constants'
import { Trace } from '../telemetry/Trace'

interface Props {
  value: string | undefined
  error: string | undefined
  onChange: (text: string | undefined) => void
  placeholderLabel: string | undefined
  onSubmit?: () => void
  showSuccess?: boolean // show succes indicator
  endAdornment?: string //text to auto to end of input string
  liveCheck?: boolean
  onBlur?: () => void
  onFocus?: () => void
}

export function GenericImportForm({
  value,
  onChange,
  error,
  placeholderLabel,
  onSubmit,
  showSuccess,
  endAdornment,
  liveCheck,
  onBlur,
  onFocus,
}: Props) {
  const { t } = useTranslation()
  const theme = useAppTheme()
  const [focused, setFocused] = useState(false)
  const [layout, setLayout] = useState<LayoutRectangle | null>()

  const handleBlur = () => {
    setFocused(false)
    onBlur?.()
  }

  const handleFocus = () => {
    setFocused(true)
    onFocus?.()
  }

  const handleSubmit = () => {
    onSubmit && onSubmit()
    Keyboard.dismiss()
  }

  return (
    <Trace section={SectionName.ImportAccountForm}>
      <Flex gap="md">
        <Flex
          centered
          backgroundColor="backgroundSurface"
          borderColor={
            showSuccess
              ? 'accentSuccess'
              : error && (liveCheck || !focused) && value
              ? 'accentFailure'
              : 'backgroundContainer'
          }
          borderRadius="lg"
          borderWidth={1}
          flexShrink={1}
          height={160}
          p="sm"
          width="100%">
          <Flex row alignItems={'flex-end'} gap="none">
            <TextInput
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
              backgroundColor="backgroundSurface"
              blurOnSubmit={true}
              fontSize={18}
              justifyContent="center"
              multiline={true}
              numberOfLines={5}
              px="none"
              py="none"
              returnKeyType="done"
              selectionColor={theme.colors.textPrimary}
              spellCheck={false}
              testID="import_account_form/input"
              textAlign={value ? 'center' : 'left'}
              value={value}
              width={value ? 'auto' : layout?.width}
              onBlur={handleBlur}
              onChangeText={onChange}
              onFocus={handleFocus}
              onSubmitEditing={handleSubmit}
            />
            {endAdornment && value && !value.includes(endAdornment) && (
              <Text color="textSecondary" fontSize={18} lineHeight={18} variant="body">
                {endAdornment}
              </Text>
            )}
          </Flex>
          {!value && (
            <Flex
              centered
              row
              gap="xs"
              position="absolute"
              top={54}
              onLayout={(event: any) => setLayout(event.nativeEvent.layout)}>
              <Text color="textSecondary" variant="body">
                {t('Type or')}
              </Text>
              <PasteButton onPress={onChange} />
              {placeholderLabel && (
                <Text color="textSecondary" variant="body">
                  {placeholderLabel}
                </Text>
              )}
            </Flex>
          )}
        </Flex>
        <Flex>
          {error && value && (liveCheck || !focused) && (
            <Flex centered row gap="sm">
              <AlertTriangle color={theme.colors.accentFailure} />
              <Text color="accentFailure" fontWeight="600" variant="body">
                {error}
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Trace>
  )
}
