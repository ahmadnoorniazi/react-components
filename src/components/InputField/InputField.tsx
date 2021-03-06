// tslint:disable:no-any
import React from "react"
import injectSheet from "react-jss"
import EditorInput from "./Editor/Editor"
import Switch from "./Switch/Switch"
import Checkbox from "./Checkbox/Checkbox"
import Calender from "./Calender/CalenderComponent"
import ColorPicker from "./ColorPicker/ColorPicker"
// @ts-ignore
import TimeKeeper from "./TimeKeeper/TimeKeeperComponent"

import { styles } from "./styles"
// @ts-ignore
import { FilePond } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

import { IProps } from "./__types/IProps"
import { InputTypes } from "../../models/InputTypes"
import materialThemeWrapper from "../MaterialThemeWrapper/MaterialThemeWrapper"
import Select from "./Select/Select"

function InputField<TValue>({ input, inputType, classes, ...rest }: IProps<TValue>) {
	const { name, onBlur = () => {}, onChange, onFocus, value } = input

	switch (inputType) {
		case InputTypes.Select:
			const onBlurForSelect = (_: React.ChangeEvent) => {
				onBlur(value)
		}

			return <Select onBlur={onBlurForSelect} onFocus={onFocus} onChange={onChange} {...rest} />
		case InputTypes.Editor:
			return (
				<div className={classes.editor}>
					<EditorInput {...input} {...rest} />
				</div>
			)
		case InputTypes.Textarea:
			return (
				<textarea
					value={value as any}
					onBlur={onBlur}
					onFocus={onFocus}
					onChange={onChange}
					className={classes.textarea}
					{...rest}
				/>
			)
		case InputTypes.Switch:
			return <Switch {...input} {...rest} />
		case InputTypes.Checkbox:
			return <Checkbox onBlur={onBlur} onChange={onChange} value={name} checked={value} {...rest} />
		case InputTypes.File:
			return <FilePond onupdatefiles={onChange as any} {...rest} />

		case InputTypes.Calender:
			return (
				<Calender
					startDate={(value as any).startDate}
					endDate={(value as any).endDate}
					date={value as any}
					onDateChange={onChange as any}
					onDatesChange={onChange as any}
					{...rest}
				/>
			)
		case InputTypes.TimePicker:
			return <TimeKeeper value={value as any} onChange={onChange as any} />
		case InputTypes.ColorPicker:
			return <ColorPicker color={value as any} onChange={onChange} />
		default:
			return (
				<input
					onBlur={onBlur}
					onFocus={onFocus}
					onChange={onChange}
					value={value as any}
					className={classes.input}
					{...rest}
				/>
			)
	}
}

// tslint:disable:no-any
// tslint:disable-next-line:no-object-mutation
InputField.defaultProps = {
	input: {
		onBlur: () => {},
		onChange: () => {},
		onDragStart: () => {},
		onDrop: () => {},
		onFocus: () => {}
	},
	meta: {
		autofilled: false,
		asyncValidating: false,
		dirty: false,
		// tslint:disable-next-line:no-any
		dispatch: (action: any) => action,
		form: "",
		initial: "",
		invalid: false,
		pristine: true,
		submitting: false,
		submitFailed: false,
		touched: false,
		valid: true,
		visited: false
	}
}

export default materialThemeWrapper(injectSheet(styles)(InputField))
