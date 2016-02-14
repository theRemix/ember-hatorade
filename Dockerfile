FROM ubuntu:14.04
LABEL container=hatorade-ember

RUN apt-get update && apt-get install -y build-essential libssl-dev libreadline-dev nodejs npm curl && apt-get clean
RUN npm -g install n
RUN n latest
RUN apt-get install -y git && apt-get clean

ENV CONFIGURE_OPTS --disable-install-rdoc

ENV RUBY_VERSION=2.2.3
RUN curl -O http://ftp.ruby-lang.org/pub/ruby/2.2/ruby-${RUBY_VERSION}.tar.gz && \
    tar -zxvf ruby-${RUBY_VERSION}.tar.gz && \
    cd ruby-${RUBY_VERSION} && \
    ./configure --disable-install-doc --enable-shared && \
    make && \
    make install && \
    cd .. && \
    rm -r ruby-${RUBY_VERSION} ruby-${RUBY_VERSION}.tar.gz && \
    echo 'gem: --no-document' > /usr/local/etc/gemrcdoc

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

RUN bower install --allow-root
RUN npm install
RUN ember build
#
EXPOSE 5055

CMD ruby sinatra_ember.rb -o 0.0.0.0

