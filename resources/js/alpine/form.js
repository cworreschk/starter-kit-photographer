import '../../../public/vendor/statamic/frontend/js/helpers.js'

export default () => ({
    success: false,
    submitted: false,
    form: null,
    init() {
        this.form = this.$form(
            'post',
            this.$refs.form.getAttribute('action'),
            JSON.parse(this.$refs.form.getAttribute('x-data')).form,
            {
                headers: {
                    'X-CSRF-Token': {
                        toString: () => this.$refs.form.querySelector('[name="_token"]').value,
                    }
                }
            }
        )
    },
    successHook(response) {
        {{ success_hook }}

        setTimeout(() => {
            this.success = false
        }, 4500)
    },
    submit() {
        this.submitted = true
        this.form.submit()
            .then(response => {
                this.form.reset()
                this.$refs.form.reset()
                this.success = true
                this.submitted = false
                this.successHook(response)
            })
            .then(this.$refs.form.scrollIntoView())
            .catch(error => {
                const summary = document.querySelector('#summary')
                if (summary) {
                    this.$focus.focus(summary.querySelector('a'))
                }
                else {
                    console.log(error)
                }
            })
    }
})
