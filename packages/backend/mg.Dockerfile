FROM mongo
COPY mongo.keyfile /opt/keyfile
RUN chmod 400 /opt/keyfile
RUN chown 999:999 /opt/keyfile
CMD ["sleep", "3600"]
