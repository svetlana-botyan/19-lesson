import { nanoid } from 'nanoid'

class Form {
  constructor (formElement) {
    this.formElement = formElement

    this.init()
  }

  init () {
    this.handleSubmitForm = this.handleSubmitForm.bind(this)

    this.formElement.addEventListener('submit', this.handleSubmitForm)
  }

  handleSubmitForm (event) {
    event.preventDefault()

    const recipe = {
      id: nanoid(), // Generate unique id
      createdAt: new Date() // when create recipe
    }
    console.log(recipe)

    const formData = new FormData(this.formElement)

    for (const [name, value] of formData.entries()) {
      recipe[name] = value
    }

    this.sendRecipe(recipe)
    this.formElement.reset()
  }

  // отправка на сервер
  async sendRecipe (data) {
    const dataJson = JSON.stringify(data)

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: dataJson
    }

    const response = await fetch('/api/posts', opts)
    // const data = await response.json()

    const event = new Event('recipes:needsRender')
    window.dispatchEvent(event)
  }
}

export { Form }
