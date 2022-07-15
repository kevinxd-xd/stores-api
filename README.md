# Stores-API
## Purpose
> Instead of having to constantly check websites to see if a product has restocked or changed, why not have a computer do it for me!
## Requirements
> Latest version of Node.js  ✅
## Install
> Open your terminal and navigate to the directory of where the repo is located on your machine
> 
> Run the command _**"npm install"**_ to install all of the necessary dependencies
> 
> Don't worry if you get a warning about the current node version you're on. As long as your Node version isn't too outdated, everything should run smoothly 
>
![npm_install](https://github.com/kevinxd-xd/stores-api/blob/main/docs/media/npm_install.png?raw=true)
## Prerequisites for .env
> If you are deploying on Heroku you may skip this part
> 
> Otherwise, if you are hosting the API locally, you may want to create a .env file with **"PORT=\<desired port\>"** if you have a particular port or site you would like to host through
>
![env_file](https://github.com/kevinxd-xd/stores-api/blob/main/docs/media/env_file.png?raw=true)

## Deplying on Heroku
> To deploy on Heroku, it's best to fork this project and then clone the repository into your system
>
> After you've cloned the repository, you can then create a dyno and push the repository to the dyno server on Heroku
>
> If you're still confused or it's your first time deploying a Node.js project, head over to the Heroku documentation and follow their tutorial! 
>
> [Heroku Documentation](https://devcenter.heroku.com/articles/deploying-nodejs)

## Usage
> Once everything is up and ready, you can start the server with _**"npm start"**_.
> 
> To make requests to a shopify site: "https://hostname.xyz/api/shopify?url=<url_encoded\_link>"
>
> Example:
>
![example_request_shopify](https://github.com/kevinxd-xd/stores-api/blob/main/docs/media/example_request_shopify.png?raw=true)
>To make requests to a uniqlo site: "https://hostname.xyz/api/uniqlo?pid=<pid\>"
>
> Example:
>
![example_request_uniqlo](https://github.com/kevinxd-xd/stores-api/blob/main/docs/media/example_request_uniqlo.png?raw=true)

## Contributing
> Feel free to fork this project to work it on your own! If you find any bugs or issues, you can make an issue post and I'll look into it to the best of my abilities!

## License
[MIT](https://github.com/kevinxd-xd/stores-api/blob/main/LICENSE)
