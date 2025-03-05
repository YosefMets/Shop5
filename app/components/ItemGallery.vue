<template>
  <div class="gallery" :class="{ alone: images_.length <= 1 }">
    <div class="slider" :style="{ backgroundColor: '#'+(item.H || 'fff') }">
      <ul class="slides" @touchstart="swipeStart" @mousedown="swipeStart">
        <li v-for="(media, i) in (images_.length > 1 ? images : images_)" class="slide" :style="slidesData?.[i]">

          <div class="video" v-if="p.item?.M?.[i]?.search(/^\w{2,4}$/) === -1">
            <iframe width="560" height="315"
                    :src="`https://www.youtube.com/embed/${p.item.M?.[i]}?controls=1&autoplay=1&loop=1&&playlist=${p.item.M?.[i]}&showinfo=0&modestbranding=1&fs=0&&mute=1`"
                    :title="p.item.N"
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
          </div>
          <template v-else>
            <NuxtImg v-if="media"
                     class="image"
                     :src="media"
                     :alt="item.N"
                     :key="item.I"
                     loading="lazy" />
<!--            <img :src="media" class="image" :alt="p.item.N" />-->
<!--            <zoom-image2 :url="zoomImages?.[i]" />-->
          </template>

        </li>
      </ul>

      <div v-if="length > 1" @click="--I" class="nav prev" :class="{ disable : !p.loop && I <= 0 }"><svg-v/></div>
      <div v-if="length > 1" @click="++I" class="nav next" :class="{ disable : !p.loop && I >= last }"><svg-v/></div>
    </div>

    <ol v-if="previews.length > 1" class="ig-pgng">
      <li v-for="(media, i) in previews" @click="I = i" :class="{ curr: i === I % previews.length }">
        <NuxtImg :src="p.item?.M?.[i]?.search(/^\w{2,4}$/) === -1 ? `https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg` : media"
                 class="ig-pvw"
                 :alt="p.item.N" />
      </li>
    </ol>
  </div>
</template>

<script setup>
import SvgV from "./imgs/svg-v";
// const { isMobile } = useDevice()

const p = defineProps({
  item: {
    type: Object,
    required: true
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  loop: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 200
  }
});

const I = ref(p.currentIndex);
const exI = ref(0);
const startX = ref(0);
const swipeX = ref(0);
const swipeLimit = ref(50);
const positioning = ref(0);

// const images_ = ref(useImageURL(p.item));
const images_ = ref( p.item.M ? new Array(p.item.M).fill().map( (x, i) => `/${p.item.I}-${i}.avif` ) : null );
const previews = ref( p.item.M ? new Array(p.item.M).fill().map( (x, i) => `/p-${p.item.I}-${i}.avif` ) : null );
const images = computed(()=> images_.value.length > 1 ? [...images_.value, ...images_.value] : images_.value )
const length = ref(images.value.length);
const last = ref(length.value-1);
const II = computed(()=> (I.value % length.value + length.value) % length.value );
const direction = computed(()=>{
  let direction = (I.value >= exI.value) ? 1 : -1
  if (I.value === 0 && exI.value === last.value) direction = 1
  if (I.value === last.value && exI.value === 0) direction = -1
  return direction
});
const positionData = computed(()=>{
  return images.value.map( (ext, i) => {
    const res = { transitionDuration: '0s' }

    if (direction.value === 1)
      if (I.value === 0 && i !== 0 && i !== last.value)
        res.transform = 'translateX('+((i+1)*100)+'%)';
      else if (I.value === last.value && i === 0)
        res.transform = 'translateX(200%)';
      else if (I.value === 1 && i === last.value)
        res.transform = 'translateX('+last.value*100+'%)';
      else
        res.transform = 'translateX('+transitionData.value?.[i]+'%)';

    if (direction.value === -1)
      if (I.value === last.value && i !== 0 && i !== last.value)
        res.transform = 'translateX('+((length.value-i)*-100)+'%)';
      else if (I.value === 0 && i === last.value)
        res.transform = 'translateX(-200%)';
      else if (I.value === last.value-1 && i === 0)
        res.transform = 'translateX('+((last.value-i)*-100)+'%)';
      else
        res.transform = 'translateX('+transitionData.value?.[i]+'%)';

      return res;
  })
});
const transitionData = computed(()=>{
  if (images_.value.length <= 1)
    return [{}]

  return images.value.map( (ext, i) => {
    let res = {
      transitionDuration: ((swipeX.value) ? 0 : p.duration) + 'ms',
      zIndex: ((i > exI.value && i < I.value) || i === I.value || i === exI.value) ? 1 : 0,
      userSelect: (swipeX.value) ? 'none' : 'unset'
    }

    let k = i - I.value
    if (k === last.value) k = -1
    if (k === last.value * -1) k = 1
    res.X = k * 100;
    res.transform = 'translateX(' + (res.X+swipeX.value) + '%)';

    return res;
  })
});
const slidesData = computed(()=>( positioning.value) ? positionData.value : transitionData.value );

watch(II, async (newI, oldI) => {
  exI.value = oldI;
  I.value = newI;

  positioning.value = true;
  await new Promise(resolve => setTimeout(resolve, 1));
  positioning.value = false;
});

const swipeStart = (e) => {
  startX.value = (e.touches && e.touches.length === 1) ? e.touches?.[0].clientX : e.clientX;
  if (startX.value) {
    document.body.addEventListener('touchmove', swipeMove)
    document.body.addEventListener('touchend', swipeEnd)
    document.body.addEventListener('mousemove', swipeMove)
    document.body.addEventListener('mouseup', swipeEnd)
  }
}
const swipeMove = (e) => {
  const currentX = (e.touches && e.touches.length === 1) ? e.touches?.[0].clientX : e.clientX;
  swipeX.value = -100 * (startX.value - currentX) / e.target.offsetWidth
}
const swipeEnd = (e) => {
  swipeX.value = 0;
  const finishX = (e.changedTouches && e.changedTouches.length === 1) ? e.changedTouches?.[0].clientX : e.clientX;
  if (startX.value < (finishX - swipeLimit.value))
    --I.value
  else if (startX.value > (finishX + swipeLimit.value))
    ++I.value

  document.body.removeEventListener('touchmove', swipeMove)
  document.body.removeEventListener('touchend', swipeEnd)
  document.body.removeEventListener('mousemove', swipeMove)
  document.body.removeEventListener('mouseup', swipeEnd)
}
</script>

<style scoped>
.gallery {
  width: 100%;
  position: relative;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}
.gallery.alone {
  grid-template-rows: 1fr;
}
.slider {
  width: 100%;
  /*height: 100%;*/
  position: relative;
  /*box-shadow: 0 0 1.4rem -0.8rem #000;*/
  /*border-radius: var(--border-radius);*/
  overflow: hidden;
  /*border-radius: var(--Br);*/
  /*border: .1rem solid #ddd;*/
  /*box-shadow: 0 0 10rem 0 #00000011;*/
}
.slider:before {
  content: '';
  position: relative;
  width: 100%;
  padding-top: 100%;
  display: block;
  z-index: 5;
  background-color: #0000000a;
  /*background: radial-gradient(circle, rgb(0 0 0 / 0) 20%, rgb(0 0 0 / 0.05) 100%);*/
}
.slider > .slides {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  /*position: relative;*/
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
}
.slider .slide {
  margin: 0;
  /*padding: 2rem;*/
  width: 100%;
  height: 100%;
  transition-property: transform;
  transition-timing-function: linear;
  position: absolute;
  left: 0;
  top: 0;
  /*background-color: #fff;*/
}

.nav {
  position: absolute;
  /*background-color: #000000cc;*/
  width: 4rem;
  height: 100%;
  top: 0;
  /*transform: translateY(-50%);*/
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transition: all .2s;
}
.nav.prev { left: 0; transform: translateX(.15rem); }
.nav.next { right: 0; transform: translateX(-.15rem); }
.nav.disable {
  opacity: .2;
  cursor: default;
}
.nav > svg {
  filter: drop-shadow( 0rem -0.2rem 0 #fff );
  width: 4rem;
  height: 2.4rem;
  stroke-width: 0.15rem
}
.nav.prev > svg {margin-right: .3rem; transform: rotate(90deg)}
.nav.next > svg {margin-left: .3rem; transform: rotate(-90deg)}
.slider:hover .nav { opacity: 1; transform: translateX(0); }

.ig-pgng {
  display: flex;
  grid-gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;

  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+  */
}
.ig-pgng::-webkit-scrollbar { /* WebKit */
  width: 0;
  height: 0;
}
.ig-pgng > li {
  /*min-width: 5rem;*/
  /*min-height: 4rem;*/
  min-width: 5rem;
  width: 5rem;
  background-color: #fff;
  margin: 0;
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  transition: transform .2s;
  position: relative;
  /*border: .2rem solid transparent;*/
  overflow: hidden;
  cursor: pointer;
  /*border-radius: var(--br);*/
}
/*ol > li:last-child {margin-right: 0;}*/
.ig-pgng > li:before {
  content: '';
  display: block;
  padding-top: 100%;
  position: relative;
  z-index: 1;
}
.ig-pgng > li.curr {
  border-color: #000;
}

.video {
  /*position: absolute;*/
  /*left: 50%;*/
  /*top: 50%;*/
  /*transform: translate(-50%, -50%);*/
  width: 100%;
  height: 100%;

}
.video:before {
  /*content: '';*/
  display: block;
  width: 100%;
  padding-top: 100%;
}

iframe {
  width: 100%;
  height: 100%;
  object-position: 50% 50%;
  object-fit: contain;
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 0;*/
}

.image {
  object-position: 50% 50%;
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.ig-pvw {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /*transition: transform .3s;*/
  object-position: 50% 50%;
  object-fit: contain;
  width: 100%;
  height: 100%;
}
ol > li.curr > .image {
  /*transform: scale(.9);*/
}


@media (max-width: 1000px) {
  .gallery {
    display: block;
  }
  .slider {
    border-radius: 0;
  }
  /*.slider:before { background-color: #0000000b; }*/
  .slider .slide {
    /*padding: 1rem 1rem 0;*/
  }

  .ig-pgng {
    background-color: #fff;
    position: absolute;
    left: 50%;
    bottom: 0;
    border-radius: 10rem;
    padding: .5rem;
    grid-gap: .5rem;
    z-index: 10;
    translate: -50% 50%;
  }
  .ig-pgng > li {
    min-width: .6rem;
    width: .6rem;
    border-radius: 50%;
    border: none;
    background-color: var(--contr);
  }
  .ig-pgng > li.curr {
    background-color: var(--active);
    transform: scale(1.2);
  }
  .ig-pvw { display: none; }
}
</style>
