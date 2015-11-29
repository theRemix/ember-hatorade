FROM ubuntu:14.04

RUN apt-get update && apt-get install -y build-essential libssl-dev libreadline-dev nodejs npm curl && apt-get clean

RUN apt-get install -y git && apt-get clean

ENV CONFIGURE_OPTS --disable-install-rdoc

# Install ruby 2.2.3
RUN curl -O http://ftp.ruby-lang.org/pub/ruby/2.2/ruby-2.2.3.tar.gz && \
    tar -zxvf ruby-2.2.3.tar.gz && \
    cd ruby-2.2.3 && \
    ./configure --disable-install-doc --enable-shared && \
    make && \
    make install && \
    cd .. && \
    rm -r ruby-2.2.3 ruby-2.2.3.tar.gz && \
    echo 'gem: --no-document' > /usr/local/etc/gemrcdoc

# Clean up downloaded packages
RUN npm install -g ember-cli

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN gem install bundler

WORKDIR /tmp
ADD ./Gemfile Gemfile
ADD ./Gemfile.lock Gemfile.lock
RUN bundle

ADD ./ /opt/hatorade

WORKDIR /opt/hatorade
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install -g
# RUN git config --global url."https://".insteadOf git://
RUN npm install -g bower
RUN git --version
# RUN bower install http://github.com/ember-cli/ember-load-initializers.git --allow-root
RUN bower install -f --allow-root

EXPOSE 5055
WORKDIR /opt/hatorade

CMD ruby sinatra_ember.rb -o 0.0.0.0
