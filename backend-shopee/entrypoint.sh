#!/bin/sh
set -e

echo "Menjalankan migration..."
npx sequelize-cli db:migrate

echo "Menjalankan server..."
exec node app.js