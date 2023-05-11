import { Injectable } from '@nestjs/common'

@Injectable()
export class LettersRenderingService {
  readonly PLACE_HOLDER_PREFIX = '{{'
  readonly PLACE_HOLDER_SUFFIX = '}}'

  render(html: string, letterParamMap: { [key: string]: string }): string {
    for (const key in letterParamMap) {
      const value = letterParamMap[key]
      const placeHolder = `${this.PLACE_HOLDER_PREFIX}${key}${this.PLACE_HOLDER_SUFFIX}`
      html = html.replace(placeHolder, value)
    }
    return html
  }

  bulkRender(html: string, letterParamMaps: { [key: string]: string }[]) {
    return letterParamMaps.map((letterParamMap) => ({
      issuedLetter: this.render(html, letterParamMap),
      fieldValues: JSON.stringify(letterParamMap),
    }))
  }
}
