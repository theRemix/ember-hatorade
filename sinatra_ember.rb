require 'sinatra'
require 'redis-objects'
require 'connection_pool'
require 'haml'
require 'pry'

configure do
  set :port, 5055
  set :environment, :developtment
  set :root, File.realpath(File.dirname(__FILE__))
  set :public_folder, File.expand_path('dist')
end
Redis::Objects.redis = ConnectionPool.new(size: 5, timeout: 5) { Redis.new(:host => 'hatorade_redis', :port => 6379) }

def redis
  redis ||= Redis::Objects.redis
end

post '/setup_submission' do
  redis['api_key']      = params['api_key']
  redis['api_secret']   = params['api_secret']
  redis['oauth_token']  = params['oauth_token']
  redis['access_secret']= params['access_secret']
  redis['domain_name']  = params['domain_name']
  redis['search_terms'] = params['search_terms']
  redirect '/'
end

get '*' do
  pass if keys_absent?
  send_file 'dist/index.html'
end

get '*' do #hack way to prevent headers from loading ember
  haml :setup, format: :html5
end

private 

def keys_absent?
  ['api_key', 'api_secret', 'domain_name', 'oauth_token', 'access_secret'].detect do |key|
    redis[key].nil? || redis[key].empty?
  end
end
