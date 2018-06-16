<template>
    <div class="skill">
        <h2>My Skills</h2>
        <div class="progress-wrap">
            <h3>C#</h3>
            <div class="progress">
                <div class="progress-bar  color1" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 99%">
                    <span class="bar-width">99%</span>
                </div>

            </div>
        </div>
        <div class="progress-wrap">
            <h3>JavaScript</h3>
            <div class="progress">
                <div class="progress-bar color4" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 95%">
                    <span class="bar-width">95%</span>
                </div>
            </div>
        </div>
        <div class="progress-wrap">
            <h3>Angular</h3>
            <div class="progress">
                <div class="progress-bar color2" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 95%">
                    <span class="bar-width">95%</span>
                </div>
            </div>
        </div>
        <div class="progress-wrap">
            <h3>Vue.js</h3>
            <div class="progress">
                <div class="progress-bar color3" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 70%">
                    <span class="bar-width">70%</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'SkillTree',
  props: {
    skills: {
      skillName: String,
      color: String,
      percent: Number
    }
  }
}
</script>

<style>
.skill h2 {
  margin-bottom: 25px;
}

.progress-wrap {
  position: relative;
}

.progress .color1,
.progress .color1 .bar-width {
  background: #2d7da4;
}

.progress .color2,
.progress .color2 .bar-width {
  background: #6aa42f;
}

.progress .color3,
.progress .color3 .bar-width {
  background: #ffcc33;
}

.progress .color4,
.progress .color4 .bar-width {
  background: #db3615;
}

.progress,
.progress-bar {
  height: 15px;
  line-height: 15px;
  background: #e6e6e6;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-radius: 0;
  overflow: visible;
  text-align: right;
}

.progress {
  position: relative;
}

.progress .bar-width {
  position: absolute;
  width: 40px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  top: -30px;
  border-radius: 2px;
  margin-left: -30px;
}

.progress span {
  position: relative;
}

.progress span:before {
  content: ' ';
  position: absolute;
  width: auto;
  height: auto;
  border-width: 8px 5px;
  border-style: solid;
  bottom: -15px;
  right: 8px;
}

.progress .color1 span:before {
  border-color: #2d7da4 transparent transparent transparent;
}

.progress .color2 span:before {
  border-color: #6aa42f transparent transparent transparent;
}

.progress .color3 span:before {
  border-color: #ffcc33 transparent transparent transparent;
}

.progress .color4 span:before {
  border-color: #db3615 transparent transparent transparent;
}
</style>
