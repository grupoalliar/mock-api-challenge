# mock-api-challenge

## Installation

mock-api-challenge necessita da versão 10.16+ do NodeJS instalada em sua maquina para que rode corretamente.

```sh
# entre na pasta do projeto
$ cd mock-api-challenge
# instale as dependencias utilizando o npm
$ npm install
```

## Running this project

```sh
# entre na pasta do projeto
$ cd mock-api-challenge
# rode o npm start
$ npm start
```
ou com hot reload

```sh
# entre na pasta do projeto
$ cd mock-api-challenge
# rode o npm run dev
$ npm run dev
```

## Examples of requests

```sh

# Lista de laboratórios
$ curl --request GET \
  --url http://localhost:3000/laboratory/

# Obter um laboratório específico
$ curl --request GET \
  --url http://localhost:3000/laboratory/{id}

# Adiciona laboratório
$ curl --request POST \
  --url http://localhost:3000/laboratory/ \
  --header 'Content-Type: application/json' \
  --data '{
	"data": {
		"name": "any name",
		"adress": "any adress"
	}
}'

# Deleta laboratório
$ curl --request DELETE \
  --url http://localhost:3000/laboratory/{id}

# Edita laboratório
$ curl --request PUT \
  --url http://localhost:3000/laboratory/{id} \
  --header 'Content-Type: application/json' \
  --data '{
	"data": {
		"name": "any name",
		"adress": "any adress",
		"status": "inativo || ativo"
	}
}'

# Lista de Exames
$ curl --request GET \
  --url http://localhost:3000/exam/

# Obtem um exame específico
$ curl --request GET \
  --url http://localhost:3000/exam/{id}

# Adiciona um exame
$ curl --request POST \
  --url http://localhost:3000/exam/ \
  --header 'Content-Type: application/json' \
  --data '{
	"data": {
		"name": "any name",
		"type": "analise clinica || imagem"
	}
}'

# Deleta um exame
$ curl --request DELETE \
  --url http://localhost:3000/exam/{id}

# Edita um exame
$ curl --request PUT \
  --url http://localhost:3000/exam/{id} \
  --header 'Content-Type: application/json' \
  --data '{
	"data": {
		"name": "any name",
		"type": "analise clinica || imagem",
		"status": "ativo || inativo"
	}
}'

# Associa um exame a um laboratório
$ curl --request POST \
  --url http://localhost:3000/laboratory/{id}/enable-exam \
  --header 'Content-Type: application/json' \
  --data '{
	"data": {
		"exam": {id}
	}
}'

# Desassocia um exame de um laboratório
$ curl --request POST \
  --url http://localhost:3000/laboratory/{id}/disable-exam \
  --header 'Content-Type: application/json' \
  --data '{
	"data": {
		"exam": {id}
	}
}'
```