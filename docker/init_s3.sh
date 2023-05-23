 #!/bin/sh
 aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket skill-matcher-bucket --acl public-read --create-bucket-configuration LocationConstraint=ap-southeast-2 --no-cli-pager
                               