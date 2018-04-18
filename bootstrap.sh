sudo apt-get update
debconf-set-selections <<< "mysql-server mysql-server/root_password password mysql"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password mysql"
sudo apt-get install -y mysql-server php-mysql
sudo apt-get -y install nodejs
sudo apt-get -y install nodejs-legacy
sudo apt-get -y install npm
sudo mysql -uroot -pmysql < /vagrant/databases/database.sql