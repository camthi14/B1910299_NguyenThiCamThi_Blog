<script>
import { defineComponent } from "vue";
import image from "../../public/img/Ashley can cook.png";

export default defineComponent({
  setup() {
    return {
      image,
    };
  },
});
</script>

<template>
  <div class="text-center mt-1" max-width="800">
    <v-card>
      <div justify="center" class="text-center mt-1">
        <v-avatar class="" color="grey-darken-1" size="150">
          <img :src="image" alt="" class="img-avt" />
        </v-avatar>

        <v-card-item>
          <v-card-title>Về chúng tôi</v-card-title>

          <v-card-subtitle>
            <span class="me-1">Mykitches Ashley</span>

            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>
        <div class="d-flex" style="justify-content: center">
          <v-rating
            :model-value="4.5"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>

          <div class="text-grey ms-4">4.5 (413)</div>
        </div>

        <div class="text-subtitle-1">$ • Italian, Cafe</div>
      </div>
      <v-card-text>
        <div>
          <p style="padding: 0 50px; text-align: center">
            Hi! Tớ là Ashley. Với tớ, nấu ăn không cần phải theo một công thức
            chuẩn nào cả vì mỗi người sẽ tự tìm cho mình một cách riêng. Đơn
            giản vì nó còn phụ thuộc vào cả cảm xúc và điều kiện của bạn khi
            nấu… Hãy nấu như bạn cảm nhận về món ăn đó nhé!
          </p>
          <p class="mt-2">
            <v-chip class="mr-2">Yêu thích nấu ăn</v-chip>
            <v-chip>Viết blog</v-chip>
          </p>

          <div>
            <v-btn
              class="ma-2"
              style="height: 40px"
              href="https://www.facebook.com/"
              icon="mdi-facebook"
              color="primary"
            ></v-btn>
            <v-btn
              class="ma-2"
              style="height: 40px"
              href="https://www.instagram.com/"
              icon="mdi-instagram"
              color="secondary"
            ></v-btn>
            <v-btn
              class="ma-2"
              style="height: 40px"
              href="https://translate.google.com/"
              icon="mdi-google"
              color="info"
            ></v-btn>
            <v-btn
              class="ma-2"
              style="height: 40px"
              href="https://www.twitter.com/"
              icon="mdi-twitter"
              color="success"
            ></v-btn>
          </div>
        </div>
      </v-card-text>
      <div style="padding: 0 50px; text-align: justify">
        <p>
          Mykitches Ashley - Dạy nấu ăn online là trang web dạy nấu ăn ngon được
          các bà nội trợ yêu thích hiện nay, ngoài cung cấp các công thức nấu ăn
          ngon, trang web còn là nơi kết nối những người yêu thích ẩm thực với
          nhau, trao đổi các công thức nấu ăn của cùng một món, giúp các công
          thức được đa dạng hóa từ đó tạo nên kho tàng công thức nấu ăn khổng lồ
          giúp bạn có nhiều phương pháp và cách thức nấu ăn phù hợp với bản thân
          và gia đình hơn.
        </p>
        <p>
          Web dạy nấu ăn online được xây dựng bởi blogger Ashley, chuyên chia
          sẻ, cập nhật những công thức nấu ăn ngon, mang đến cho bạn những câu
          chuyện thường nhật của tác giả và các công thức nấu ăn đặc biệt từ các
          món Việt, đến các món ăn trên thế giới.
        </p>
        <p>
          Ưu điểm: Cung cấp thư viện công thức nấu ăn từ món Việt đến món Tây vô
          cùng đa dạng, phong phú. Luôn cập nhật công thức nấu ăn mới lạ, độc
          đáo hàng ngày. Luôn cập nhật các video dạy nấu ăn hấp dẫn, thu hút.
          Giao diện hỗ trợ Tiếng Việt, thân thiện với người dùng, bắt mắt. Thư
          viện thực đơn hơn 32000 công thức nấu ăn vô cùng độc đáo. Trình tìm
          kiếm thông minh theo: thực đơn, loại món, độ khó, mùa và dịp lễ hội,
          mục đích,... giúp bạn dễ dàng tìm được công thức thực hiện phù hợp với
          bản thân và gia đình. Luôn tổng hợp, cập nhật các công thức nấu ăn
          trending nhất. Có các video dạy nấu ăn vô cùng chi tiết và hấp dẫn.
          Cộng đồng rộng lớn với hơn 1600 công thức nấu ăn được đóng góp, chia
          sẻ bởi các thành viên của Ashley. Giao diện đẹp mắt, hấp dẫn.
        </p>
      </div>
    </v-card>
  </div>
</template>
