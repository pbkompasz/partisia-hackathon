 {/* E.g. my package is damaged */}
            {/* E.g. my package has been tampered with / is underweight / is the wrong one */}
            {/* Here are pictures of your package, select the first one you think your package might have been damaged */}
            {/* User uploads a photo, some operator/AI analyses it, and user can perform the checks */}
// TODO Track package
const trackPackage = (trackingNumber) => {

}

// TODO Report damaged/mishandled package (specifically go through weight history to check if something is missing)
const createReport = (trackingNumber, type) => {

}

// TODO Proof of delivery
const createProofOfDelivery = (trackingNumber) => {

}

export {
  trackPackage,
  createReport,
  createProofOfDelivery,
}