# Use the official Ruby image as the base
FROM ruby:3.4.5@sha256:04121e637d449ec6a93b4f4d05eef7bd55be4ffb04391127cab0999676c2de47

# Install Jekyll and Bundler
RUN gem install jekyll bundler

# Set the working directory
WORKDIR /usr/src/app

# Change the permissions of the working directory
RUN chmod 777 /usr/src/app

# Copy the Gemfile into the image
COPY Gemfile ./
COPY Gemfile.lock ./

# Install the gems
RUN bundle install --no-cache

# Copy the rest of the project into the image
COPY . .

# Expose the port Jekyll will run on
EXPOSE 4000

# The default command to run Jekyll
CMD ["jekyll", "serve", "--host", "0.0.0.0", "--livereload"]
