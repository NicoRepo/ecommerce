#!/bin/bash

CWD=$(dirname $(readlink -f $0))
cd ${CWD}

source .env

WORKERS=${WORKERS:-1}
RUN_MODE=${RUN_MODE:-'PROD'}
VENV=${VENV:-"env/bin/activate"}

test -z "${VIRTUAL_ENV}" && {
  test -n "${FORCE_NO_VENV}" && { echo "WARNING: Virtual ENV usage was disabled manually with FORCE_NO_VENV."; } || {
    test -f ${VENV} || { echo "ERROR: Virtual ENV is not enabled and activation script ./${VENV} was not found. Aborting"; exit 3;}
    source ${VENV};
  }
} || { echo "INFO: Virtual ENV already active."; }

test -n ${RUN_MODE} -a "${RUN_MODE}" == "PROD" && {
    RELOAD=;
  } || {
    RELOAD='--reload';
    WORKERS=1;
  }


#NOTE: Move to gunicorn -> uvicorn -> app
test -n ${RUN_MODE} -a "${RUN_MODE}" == "DEV" && {
    RELOAD="--reload --reload-dir ./app --reload-delay 1";
    uvicorn --port ${PORT} app.main:app --access-log ${RELOAD};
  } || {
    RELOAD=;
    gunicorn -w ${WORKERS} -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:${PORT} app.main:app
}
