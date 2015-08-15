require 'sinatra'

configure do
  set :root, File.realpath(File.dirname(__FILE__))
  set :public_folder, File.expand_path('dist')
end

get '*' do
  send_file 'dist/index.html'
end
