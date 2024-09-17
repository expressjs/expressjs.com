# Use the official Ruby image as the base
FROM ruby:3.3.5

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
