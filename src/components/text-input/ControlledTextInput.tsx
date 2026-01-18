import {type ComponentProps, ReactNode} from 'react';
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme, customText} from 'react-native-paper';

type ControlledTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<
    ComponentProps<typeof TextInput>,
    'value' | 'onChangeText' | 'onBlur' | 'disabled'
  > & {errorHelper?: ReactNode; variant?: FontWeight};

type FontWeight = 'regular' | 'medium';

const Text = customText<FontWeight>();

export function ControlledTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControlledTextInputProps<TFieldValues, TName>) {
  const {
    placeholder,
    mode,
    placeholderTextColor,
    shouldUnregister,
    disabled,
    rules,
    name,
    control,
    error = false,
    errorHelper,
    ...restTextProps
  } = props;
  const {style = {}, contentStyle = {}} = restTextProps;
  const theme = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      disabled={disabled}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({field}) => (
        <>
          <TextInput
            onChangeText={field.onChange}
            value={field.value ?? ''}
            onBlur={field.onBlur}
            placeholder={placeholder ?? 'Fill Input Field'}
            mode={mode ?? 'flat'}
            cursorColor="black"
            placeholderTextColor={String(placeholderTextColor ?? '#A0A5BA')}
            contentStyle={[
              {
                ...textInputStyles.textInput,
              },
              contentStyle,
            ]}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            style={[
              {
                backgroundColor: theme.colors.secondary,
                ...textInputStyles.style,
              },
              style,
            ]}
            theme={{roundness: 10}}
            {...restTextProps}
          />
          {error && (
            <Text variant="regular" style={textInputStyles.errorHelper}>
              {errorHelper}
            </Text>
          )}
        </>
      )}
    />
  );
}

const textInputStyles = StyleSheet.create({
  textInput: {
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 62,
  },
  underlineStyle: {
    display: 'none',
  },
  style: {
    marginTop: 8,
    borderRadius: 10,
  },
  errorHelper: {
    color: 'red',
    marginTop: 4,
  },
});
