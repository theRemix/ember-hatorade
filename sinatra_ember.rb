require 'sinatra'

configure do
  set :port, 5055
  set :environment, :production
  set :root, File.realpath(File.dirname(__FILE__))
  set :public_folder, File.expand_path('dist')
end

get '*' do
  send_file 'dist/index.html'
end
