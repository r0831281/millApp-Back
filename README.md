# Inventory App APi
- docker
- django-ninja REST Framework
- Postgresql

## installation:
- make sure to install Docker

`git clone https://github.com/r0831281/millApp-Back.git`

`cd millApp-Back`

## run:

`Docker compose up`

## for dev:

### make venv:

- `python3 -m venv /path/to/new/virtual/environment` 

- `.\venv\Scripts\Activate` 

### install requirements

- `pip install -r requirements.txt`

To get interactive (stable) tty shell:

- attach docker shell to web container
- run `chmod +x level.sh`
- run `./level.sh`

-install dependencies in venv