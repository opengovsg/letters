import { sanitizeHtml } from '../html-sanitizer'

describe('sanitizeHtml', () => {
  it('accepts templated fields', () => {
    const html = `<p>this is a test template {{ placeholder1 }}</p><p>{{firstName}}{{ last_name }}</p>`
    const sanitizedHtml = sanitizeHtml(html)
    expect(sanitizedHtml).toBe(html)
  })

  it('accepts templated fields with common HTML elements', () => {
    const html = `<h1>{{header}}</h1><p><b><i><u>{{text}}</u></i></b></p><div></div><br><a href="https://www.example.com">link</a><img src="/logo.png"><ul><li>foo</li><li>bar</li><ol><li>one</li><li>two</li></ol></ul>`
    const sanitizedHtml = sanitizeHtml(html)
    expect(sanitizedHtml).toBe(html)
  })

  it('removes scripts and onload attributes', () => {
    const html = `<p>this is some test text</p><script>alert('script test')</script><img src="/logo.png" onload="alert('onload test')">`
    const expectedHtml = `<p>this is some test text</p><img src="/logo.png">`
    const sanitizedHtml = sanitizeHtml(html)
    expect(sanitizedHtml).toBe(expectedHtml)
  })

  it('removes svg', () => {
    const html = `<p>this is some test text</p><svg height="210" width="500"><line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />Sorry, your browser does not support inline SVG.</svg><p>end</p>`
    const expectedHtml = `<p>this is some test text</p><p>end</p>`
    const sanitizedHtml = sanitizeHtml(html)
    expect(sanitizedHtml).toBe(expectedHtml)
  })

  it('removes mathml', () => {
    const html = `<p>this is some test text</p><math><mrow><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup><mo>=</mo><msup><mi>c</mi><mn>2</mn></msup></mrow></math><p>end</p>`
    const expectedHtml = `<p>this is some test text</p><p>end</p>`
    const sanitizedHtml = sanitizeHtml(html)
    expect(sanitizedHtml).toBe(expectedHtml)
  })
})
