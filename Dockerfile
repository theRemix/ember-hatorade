FROM ubuntu:16.04
MAINTAINER Doug Headley <headley.douglas@gmail.com>

LABEL container=hatorade-ember
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y build-essential curl zlib1g-dev zlib1g zlibc openssl libssl-dev libreadline-dev

ENV CONFIGURE_OPTS --disable-install-rdoc

ENV RUBY_VERSION=2.4.2
RUN curl -O http://ftp.ruby-lang.org/pub/ruby/2.4/ruby-${RUBY_VERSION}.tar.gz && \
    tar -zxvf ruby-${RUBY_VERSION}.tar.gz && \
    cd ruby-${RUBY_VERSION} && \
    ./configure --disable-install-doc --enable-shared && \
    make && \
    make install && \
    cd .. && \
    rm -r ruby-${RUBY_VERSION} ruby-${RUBY_VERSION}.tar.gz && \
    echo 'gem: --no-document' > /usr/local/etc/gemrcdoc

RUN apt-get install -y git libreadline-dev nodejs\
    npm postgresql-client libpq-dev

RUN apt-get clean
RUN npm -g install n
RUN n latest
# Clean up downloaded packages
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN gem install bundler

WORKDIR /tmp
ADD ./Gemfile Gemfile
ADD ./Gemfile.lock Gemfile.lock
RUN bundle

RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install install -g
RUN npm install -g ember-cli --save
RUN npm install -g bower --save

ADD ./ /opt/hatorade
WORKDIR /opt/hatorade

# RUN yarn
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/hatorade && cp -a /tmp/node_modules /opt/hatorade
# RUN bower install --allow-root
RUN bower install faye-browser --allow-root
RUN ember build --environment ${STACK_ENV}
#
EXPOSE 5055

CMD ruby sinatra_ember.rb -o 0.0.0.0

