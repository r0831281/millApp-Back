
#super secret secret
JWT_SIGNING_KEY = 'secretstring'

#expiration time in minutes
JWT_ACCESS_EXPIRY = 60


'''
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
cat jwtRS256.key
cat jwtRS256.key.pub
'''
