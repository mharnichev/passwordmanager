<template>
  <section class="mp">
    <div class="mp__left">
      <div class="mp__create-card">
        <h4 class="mp__card-title">You can create you card here</h4>

        <form class="mp__form">
          <label class="c-input-label">
            <p class="c-input-h4">Card name</p>
            <input
              v-model="newCard.card_name"
              type="text"
              class="lp__login-input c-input-input"
            />
          </label>

          <label class="c-input-label">
            <p class="c-input-h4">Password</p>
            <input
              v-model="newCard.password"
              type="text"
              class="lp__login-input c-input-input"
            />
          </label>

          <button @click.prevent="addCard" class="add-card c-btn">
            Add Card
          </button>
        </form>
      </div>
    </div>

    <div class="mp__right">
      <template v-if="currentUser.pass_cards.length">
        <div
          v-for="(card, i) in currentUser.pass_cards"
          :key="i"
          class="mp__pass-card"
        >
          <h4 class="mp__pass-card_title c-input-h4">{{ card.card_name }}</h4>

          <label class="c-input-label">
            <input
              :input-id="i"
              :value="card.password"
              ref="input"
              :type="card.showPass ? 'text' : 'password'"
              :disabled="card.disabled"
              class="c-input-input"
            />
            <svg
              v-if="!card.showPass"
              @click="card.showPass = true;"
              style="margin-left: 10px; max-width: 30px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              xmlns:v="https://vecta.io/nano"
            >
              <path
                d="M320 256a64 64 0 1 1-64-64 64.07 64.07 0 0 1 64 64zm189.81 9.42C460.86 364.89 363.6 426.67 256 426.67S51.14 364.89 2.19 265.42a21.33 21.33 0 0 1 0-18.83C51.14 147.11 148.4 85.33 256 85.33s204.86 61.78 253.81 161.25a21.33 21.33 0 0 1 0 18.84zM362.67 256A106.67 106.67 0 1 0 256 362.67 106.79 106.79 0 0 0 362.67 256z"
              />
            </svg>
            <svg
              v-if="card.showPass"
              @click="card.showPass = false;"
              style="margin-left: 10px; max-width: 30px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              xmlns:v="https://vecta.io/nano"
            >
              <path
                d="M409.84 132.33l95.91-95.91a21.33 21.33 0 1 0-30.17-30.17L6.25 475.58a21.33 21.33 0 1 0 30.17 30.17L140.77 401.4A275.84 275.84 0 0 0 256 426.67c107.6 0 204.85-61.78 253.81-161.25a21.33 21.33 0 0 0 0-18.83 291 291 0 0 0-99.97-114.26zM256 362.67a105.78 105.78 0 0 1-58.7-17.8l31.21-31.21A63.29 63.29 0 0 0 256 320a64.07 64.07 0 0 0 64-64 63.28 63.28 0 0 0-6.34-27.49l31.21-31.21A106.45 106.45 0 0 1 256 362.67zM2.19 265.42a21.33 21.33 0 0 1 0-18.83C51.15 147.11 148.4 85.33 256 85.33a277 277 0 0 1 70.4 9.22l-55.88 55.88a105.9 105.9 0 0 0-120.08 120.09l-82.56 82.56a295.2 295.2 0 0 1-65.69-87.66z"
              />
            </svg>
          </label>

          <div class="mp__pass-card_btns">
            <button
              class="c-btn pass-card"
              @click.prevent="
                card.disabled = false;
                card.showPass = true;
              "
            >
              Edit
            </button>
            <button
              class="c-btn pass-card"
              @click.prevent="
                saveCard(card, i, 'save');
                card.disabled = true;
                card.showPass = false;
              "
            >
              Save
            </button>
            <button class="c-btn pass-card" @click.prevent="deleteCard(card)">
              Delete
            </button>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      newCard: {
        card_name: "",
        password: "",
      },
      currentUser: {},
    };
  },
  created() {
    const currentUser = JSON.parse(localStorage.getItem("accessUser"));
    this.currentUser = currentUser;
  },
  methods: {
    addCard() {
      const currentUser = JSON.parse(localStorage.getItem("accessUser"));

      const id =
        currentUser.pass_cards.length == 0
          ? currentUser.pass_cards.length
          : currentUser.pass_cards.length++;

      const newCard = {
        card_name: this.newCard.card_name,
        password: this.newCard.password,
        id: id,
        disabled: true,
        showPass: false,
      };

      currentUser.pass_cards.push(newCard);
      currentUser.pass_cards = currentUser.pass_cards.filter(
        (item) => item !== null
      );

      localStorage.setItem("accessUser", JSON.stringify(currentUser));
      this.currentUser.pass_cards = [...currentUser.pass_cards];

      this.newCard.card_name = "";
      this.newCard.password = "";
    },
    saveCard(card, i) {
      const currentPassword = document.querySelector(`[input-id="${i}"]`).value;
      const userPassArray = this.currentUser.pass_cards;
      card.password = currentPassword;
      userPassArray[i] = card;
      this.currentUser.pass_cards = [...userPassArray];
      localStorage.setItem("accessUser", JSON.stringify(this.currentUser));
    },
    deleteCard(pickedCard) {
      const currentUser = JSON.parse(localStorage.getItem("accessUser"));
      currentUser.pass_cards = currentUser.pass_cards.filter(
        (item) => item.id !== pickedCard.id
      );
      localStorage.setItem("accessUser", JSON.stringify(currentUser));
      this.currentUser.pass_cards = currentUser.pass_cards;
    },
  },
};
</script>

<style scoped lang="scss">
.mp {
  display: flex;
  flex: 1 1 auto;

  &__right {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: end;
    height: 85vh;
    overflow: scroll;
  }

  &__card-title {
    padding-bottom: 18px;
    font-weight: 600;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 360px;
    max-width: 360px;
    width: 100%;
    background-color: #2c3e50;
    border-radius: 0 0 10px 0;
  }

  &__create-card {
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }

  &__pass-card {
    max-width: 250px;
    width: 100%;
    border: 1px solid #000;
    border-radius: 4px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    &_title {
      font-weight: 600;
      padding-bottom: 1rem;
    }

    &_btns {
      display: flex;
    }
  }
}

.c-btn.pass-card {
  margin-right: 10px;
  margin-bottom: 0;
}
</style>
