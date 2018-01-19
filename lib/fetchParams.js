const aws = require('aws-sdk')

module.exports = ({ path, awsConfig }) => {
  const ssm = new aws.SSM(awsConfig)

  function fetchParams (NextToken) {
    return ssm.getParametersByPath({
      Path: path,
      WithDecryption: true,
      NextToken
    }).promise()
    .then(handlePagination)
  }

  function handlePagination ({ Parameters = [], NextToken } = {}) {
    if (NextToken) {
      return fetchParams(NextToken)
      .then(next => ({ Parameters: Parameters.concat(next.Parameters) }))
    }
    return { Parameters }
  }

  return fetchParams()
}
