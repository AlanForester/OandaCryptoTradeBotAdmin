#! /bin/sh

# Remind the user to set up the database
echo "Make sure you have created a DB called 'iqfx', and that you have run the migrations in .knex/"

# Set up environment variables:

# URL for the database
export USER="postgres"
export POSTGRESQL_URL="postgres://postgres@127.0.0.1/iqfx"

# Directory with cloned Postgres packages from this repo
export METEOR_PACKAGE_DIRS="$(dirname $0)/packages/"

# Fake MONGO_URL so that Meteor doesn't start MongoDB for us
export MONGO_URL="nope"

# Go to the app's directory in case we ran the script from somewhere else
cd "$(dirname $0)"

# Run the app, and pass through any arguments passed to the script
meteor "$@"
