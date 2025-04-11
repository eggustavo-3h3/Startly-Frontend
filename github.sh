#!/bin/sh

#Altere as variáveis abaixo de acordo com a sua necessidade
#na variável repositório, prefira a url do repositório baseada em https para nao termos que configurar SSH
export name='Mirela Teles'
export email="telesmirela552@gmail.com"
export repositorio="https://github.com/eggustavo-3h3/AnaPaulaEstetica-Frontend.git";

#Daqui pra baixo mexa somente se for realmente necessário ou se souber o que está fazendo :P
git config --global user.name $name
git config --global user.email $email

git add .
git commit -am "código produzido no encontro do dia $(date)"

git push origin main