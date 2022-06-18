function getFileDecoded (request) {
  const base64File = request.body?.base64File
  if (!base64File) {
    return false;
  }
  const base64Buffer = new Buffer.from(base64File, 'base64');
  const base64Decoded = base64Buffer.toString('ascii');
  return base64Decoded;
}

export default getFileDecoded;
