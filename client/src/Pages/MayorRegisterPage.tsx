import React from 'react'

export default function MayorRegisterPage() {
	return (
		<main>
			<form>
				<div>
					<label htmlFor="name">Nome completo:</label>
					<input type="text" id="full-name" />
				</div>
				<div>
					<label htmlFor="email">Nome do vice:</label>
					<input type="text" id="vice-name" />
				</div>
				<div>
					<label htmlFor="email">Número de votação (legenda):</label>
					<input type="text" id="vote-number" />
				</div>
				<button type="submit">Cadastrar</button>
			</form>
		</main>
	)
}
