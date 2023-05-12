import { Injectable } from '@nestjs/common'

export class RenderedLetter {
  issuedLetter: string
  fieldValues: string
}

@Injectable()
export class LettersRenderingService {
  readonly PLACE_HOLDER_PREFIX = '{{'
  readonly PLACE_HOLDER_SUFFIX = '}}'

  render(
    html: string,
    letterParamMap: { [key: string]: string },
  ): RenderedLetter {
    for (const key in letterParamMap) {
      const value = letterParamMap[key]
      const placeHolder = `${this.PLACE_HOLDER_PREFIX}${key}${this.PLACE_HOLDER_SUFFIX}`
      html = html.replace(placeHolder, value)
    }
    return { issuedLetter: html, fieldValues: JSON.stringify(letterParamMap) }
  }

  bulkRender(
    html: string,
    letterParamMaps: { [key: string]: string }[],
  ): RenderedLetter[] {
    return letterParamMaps.map((letterParamMap) =>
      this.render(html, letterParamMap),
    )
  }
}
