var app = new Vue({
    el: '#app',
    data: {
        link: 'tech.gov.sg',
        question: '',
        answer: '',
        loading: false,
        showing: false,
        total: 0,
        correct: 0,
        entered: false
    },
    methods: {
        show: function (event) {
            this.showing = !this.showing;
        },
        getQuiz: function () {
            const vm = this;

            axios.get('/quiz/')
                .then(function (response) {
                    console.log(response);
                    console.log(response.data.question);
                    vm.loading = false;
                    vm.question = response.data.question;
                    vm.answer = response.data.answer;
                    vm.showing = false;
                    vm.entered = false;
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        addOnePoint: function () {

            if (!this.entered) {

                var total = parseInt(localStorage.getItem("total"));
                var correct = parseInt(localStorage.getItem("correct"));

                localStorage.setItem("total", total + 1);
                localStorage.setItem("correct", correct + 1);

                this.total += 1;
                this.correct += 1;
                this.entered = true;
            }
        },
        addZeroPoints: function () {
            
            if (!this.entered) {
                var total = parseInt(localStorage.getItem("total"));
                var correct = parseInt(localStorage.getItem("correct"));
                
                localStorage.setItem("total", total + 1);
                localStorage.setItem("correct", correct + 1);
                
                this.total += 1;
                this.entered = true;
            }
        },
        reset: function () {
            this.total = 0;
            this.correct = 0;
        }
    },
    mounted: function () {
        const vm = this;

        axios.get('/quiz/')
            .then(function (response) {
                console.log(response);
                console.log(response.data.question);
                vm.loading = false;
                vm.question = response.data.question;
                vm.answer = response.data.answer;
                vm.showing = false;
                vm.entered = false;
            })
            .catch(function (error) {
                console.log(error)
            })
    }
})
