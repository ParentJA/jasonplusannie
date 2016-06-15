# Standard library imports...
import random

# Third-party imports...
from fabric.api import env, local, run
from fabric.contrib.files import append, exists, sed

__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

REPO_URL = 'https://github.com/ParentJA/jasonplusannie.git'

LOCAL_SETTINGS_FILE = """
import os

__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, '../database/db.sqlite3'),
    }
}

STATIC_ROOT = os.path.join(BASE_DIR, '../static')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'www/app/src'),
    os.path.join(BASE_DIR, 'www/dist'),
    os.path.join(BASE_DIR, 'www/res'),
    os.path.join(BASE_DIR, 'www/bower_components'),
)
"""


def deploy():
    site_folder = '/home/{user}/sites/{host}'.format(user=env.user, host='jasonplusannie.com')
    source_folder = site_folder + '/source'
    _create_directory_structure_if_necessary(site_folder)
    _get_latest_source(source_folder)
    _update_settings(source_folder, 'jasonplusannie.com')
    _create_local_settings(source_folder, 'jasonplusannie.com')
    _update_virtualenv(source_folder)
    _update_static_files(source_folder)
    _update_database(source_folder)


def _create_directory_structure_if_necessary(site_folder):
    for subfolder in ('static', 'source'):
        run('mkdir -p {site_folder}/{subfolder}'.format(site_folder=site_folder, subfolder=subfolder))


def _get_latest_source(source_folder):
    if exists(source_folder + '/.git'):
        run('cd {source_folder} && git fetch'.format(source_folder=source_folder))
    else:
        run('git clone {repo_url} {source_folder}'.format(repo_url=REPO_URL, source_folder=source_folder))

    current_commit = local("git log -n 1 --format=%H", capture=True)
    run('cd {source_folder} && git reset --hard {current_commit}'.format(
            source_folder=source_folder, current_commit=current_commit
    ))


def _update_settings(source_folder, site_name):
    settings_path = source_folder + '/jasonplusannie/settings.py'
    sed(settings_path, "DEBUG = True", "DEBUG = False")
    sed(settings_path, 'ALLOWED_HOSTS =.+$', 'ALLOWED_HOSTS = ["{site_name}"]'.format(site_name=site_name))
    secret_key_file = source_folder + '/jasonplusannie/secret_key.py'

    if not exists(secret_key_file):
        chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
        key = ''.join(random.SystemRandom().choice(chars) for _ in range(50))
        append(secret_key_file, "SECRET_KEY = '{key}'".format(key=key))

    append(settings_path, '\nfrom .secret_key import SECRET_KEY')


def _create_local_settings(source_folder, site_name):
    local_settings_path = source_folder + '/jasonplusannie/local_settings.py'

    # Remove any existing local_settings.py file.
    run('rm {local_settings_path}'.format(local_settings_path=local_settings_path))

    # Create a local_settings.py file.
    run('touch {local_settings_path}'.format(local_settings_path=local_settings_path))

    append(local_settings_path, LOCAL_SETTINGS_FILE)


def _update_virtualenv(source_folder):
    virtualenv_folder = '/home/parentj/.virtualenvs/jasonplusannie'

    if not exists(virtualenv_folder):
        run('mkvirtualenv jasonplusannie')

    run('{virtualenv_folder}/bin/pip install -r {source_folder}/requirements.txt'.format(
        virtualenv_folder=virtualenv_folder, source_folder=source_folder
    ))


def _update_static_files(source_folder):
    virtualenv_folder = '/home/parentj/.virtualenvs/jasonplusannie'

    run('cd {source_folder} && {virtualenv_folder}/bin/python manage.py collectstatic --noinput'.format(
        source_folder=source_folder, virtualenv_folder=virtualenv_folder
    ))


def _update_database(source_folder):
    virtualenv_folder = '/home/parentj/.virtualenvs/jasonplusannie'

    run('cd {source_folder} && {virtualenv_folder}/bin/python manage.py migrate --noinput'.format(
        source_folder=source_folder, virtualenv_folder=virtualenv_folder
    ))
