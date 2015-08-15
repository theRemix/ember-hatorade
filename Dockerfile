FROM ubuntu:14.04

RUN apt-get update && apt-get install -y build-essential libssl-dev libreadline-dev nodejs wget curl && apt-get clean

RUN apt-get install -y git-core && apt-get clean

ENV CONFIGURE_OPTS --disable-install-rdoc

# Install ruby 2.2.2
RUN curl -O http://ftp.ruby-lang.org/pub/ruby/2.2/ruby-2.2.2.tar.gz && \
    tar -zxvf ruby-2.2.2.tar.gz && \
    cd ruby-2.2.2 && \
    ./configure --disable-install-doc --enable-shared && \
    make && \
    make install && \
    cd .. && \
    rm -r ruby-2.2.2 ruby-2.2.2.tar.gz && \
    echo 'gem: --no-document' > /usr/local/etc/gemrcdoc

# Clean up downloaded packages
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN gem install bundler

WORKDIR /tmp
ADD ./Gemfile Gemfile
ADD ./Gemfile.lock Gemfile.lock
RUN bundle

ADD ./ /opt/hatorade

WORKDIR /opt/hatorade

CMD ruby sinatra_ember.rb

