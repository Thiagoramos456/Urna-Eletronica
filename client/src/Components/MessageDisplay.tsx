import React from 'react'
import IMessageDisplay from './Interfaces/IMessageDisplay'

export default function ErrorDisplay({ message, messageType } : IMessageDisplay) {
	return (
		<div>
			<span className={ messageType }>{ message }</span>
		</div>
	)
}
