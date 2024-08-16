# Use the official Jekyll image as the base
FROM jekyll/jekyll:4.2.2

# version of Ruby
ENV RUBY_VERSION=3.1.1

# Set the working directory
WORKDIR /usr/src/app

# Change the permissions of the working directory
RUN chmod 777 /usr/src/app

# Copy the Gemfile into the image
COPY Gemfile ./

# Install the gems and delete the Gemfile.lock
RUN bundle install --no-cache && rm Gemfile.lock

# Copy the rest of the project into the image
COPY . .

# Expose the port Jekyll will run on
EXPOSE 4000

# The default command to run Jekyll
CMD ["jekyll", "serve", "--host", "0.0.0.0", "--livereload"]
