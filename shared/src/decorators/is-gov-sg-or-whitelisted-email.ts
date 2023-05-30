import { isEmail, registerDecorator, ValidationOptions } from 'class-validator'
import { Minimatch } from 'minimatch'

const HEALTH_VALID_EMAIL_GLOB_EXPRESSION =
  '*@@(nuhs.edu|ihis.com|alpshealthcare.com|1fss.com|ndcs.com|nni.com|nhcs.com|nccs.com|notu.com|scbb.com|snec.com|nsc.com|moht.com|mohh.com|nhgp.com|yishunhospital.com|ttsh.com|sgh.com|skh.com|kkh.com|imh.com|ktph.com|cgh.com|nhg.com|diagnostics.nhg.com|pharmacy.nhg.com|singhealth.com|singhealthch.com|wh.com|nhic.cris|actris.cris|precise.cris|stcc.cris|scri.cris|open.gov|cris|aic|ncid|pca).sg'
const EDU_VALID_EMAIL_GLOB_EXPRESSION =
  '*@@(rp.edu|sp.edu|adj.np.edu|np.edu|nyp.edu|tp.edu|a-star.edu|acrc.a-star.edu|aero.a-star.edu|amc.a-star.edu|artc.a-star.edu|asrl.a-star.edu|bii.a-star.edu|biotrans.a-star.edu|bmsi.a-star.edu|brc.a-star.edu|bti.a-star.edu|circ.a-star.edu|d3.a-star.edu|dsi.a-star.edu|ebc.a-star.edu|eddc.a-star.edu|epgc.a-star.edu|etc.a-star.edu|gis.a-star.edu|hnl.a-star.edu|hq.a-star.edu|i2r.a-star.edu|i3.a-star.edu|ibb.a-star.edu|ibn.a-star.edu|ices.a-star.edu|idg.a-star.edu|idlabs.a-star.edu|ihpc.a-star.edu|imb.a-star.edu|imcb.a-star.edu|ime.a-star.edu|immunol.a-star.edu|imre.a-star.edu|isce2.a-star.edu|jrl.a-star.edu|mel.a-star.edu|merl.a-star.edu|nbl.a-star.edu|nmc.a-star.edu|nscc.a-star.edu|p53lab.a-star.edu|rsc.a-star.edu|sbic.a-star.edu|scei.a-star.edu|sics.a-star.edu|sifbi.a-star.edu|simtech.a-star.edu|sris.a-star.edu|tlgm.a-star.edu|ite.edu|science.edu|moe.edu|sota.edu|sirs.edu|aci.edu|nace.edu|iseas.edu|etpl|open.gov|schools.gov).sg'

const healthGlobValidator = new Minimatch(HEALTH_VALID_EMAIL_GLOB_EXPRESSION, {
  noext: false,
  noglobstar: true,
  nobrace: true,
  nonegate: true,
})

const eduGlobValidator = new Minimatch(EDU_VALID_EMAIL_GLOB_EXPRESSION, {
  noext: false,
  noglobstar: true,
  nobrace: true,
  nonegate: true,
})

export const isGovSgOrWhitelistedEmail = (value: unknown) => {
  return (
    typeof value === 'string' &&
    isEmail(value) &&
    (value.toString().endsWith('.gov.sg') ||
      healthGlobValidator.match(value.toString()) ||
      eduGlobValidator.match(value.toString()))
  )
}

export const IsGovSgOrWhitelistedEmail = (options?: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isGovSgOrWhitelistedEmail',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate: (value: unknown) => isGovSgOrWhitelistedEmail(value),
      },
    })
  }
}
