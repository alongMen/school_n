'use strict';

const BaseController = require('./base');
const svgCaptcha = require('svg-captcha')
const { sign } = require('jsonwebtoken')
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');


class Controller extends BaseController {
    constructor(...args) {
        super(...args);
        this.entity = "course"
    }
    async getCourse() {
        const { ctx, service } = this
        const classnum = ctx.params.classnum;
        const course = await ctx.service.course.getCourse(classnum);
        ctx.body = course;
    }
    async import() {
        const { ctx } = this;
        const stream = await this.ctx.getFileStream();
        console.log('-----------获取数据 start--------------');
        console.log(stream.fields);
        console.log('-----------获取数据 end--------------');
        // 基础的目录
        const uplaodBasePath = 'app/public/uploads';
        // 生成文件名
        const filename = `${Date.now()}${Number.parseInt(
            Math.random() * 1000,
        )}${path.extname(stream.filename).toLocaleLowerCase()}`;
        // 生成文件夹
        const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
        function mkdirsSync(dirname) {
            if (fs.existsSync(dirname)) {
                return true;
            } else {
                if (mkdirsSync(path.dirname(dirname))) {
                    fs.mkdirSync(dirname);
                    return true;
                }
            }
        }
        mkdirsSync(path.join(uplaodBasePath, dirname));
        // 生成写入路径
        const target = path.join(uplaodBasePath, dirname, filename);
        // 写入流
        const writeStream = fs.createWriteStream(target);
        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            this.error();
        }
        // this.success({ url: path.join('/public/uploads', dirname, filename) });
        // 读取内容
        const workbook = xlsx.readFile(target);
        const sheetNames = workbook.SheetNames; //获取表名
        const sheet = workbook.Sheets[sheetNames[0]]; //通过表名得到表对象
        const thead = [sheet.A1.v, sheet.B1.v, sheet.C1.v, sheet.D1.v, sheet.E1.v, sheet.F1.v, sheet.G1.v, sheet.H1.v, sheet.I1.v, sheet.J1.v, sheet.K1.v, sheet.L1.v, sheet.M1.v, sheet.N1.v, sheet.O1.v];
        const data = xlsx.utils.sheet_to_json(sheet); //通过工具将表对象的数据读出来并转成json
        const theadRule = ['时间','周一', '周二', '周三', '周四', '周五', '周六', '周日', '周一', '周二', '周三', '周四'];
        const isValid = thead.every((value, index) => value === theadRule[index]);
        if (!isValid) {
            ctx.failure('上传的excel格式错误');
            return false;
        }

        const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push({
                date:data[i][thead[0]],
                dayone: data[i][thead[1]],
                daytwo: data[i][thead[2]],
                daythree: data[i][thead[3]],
                dayfour: data[i][thead[4]],
                dayfive: data[i][thead[5]],
                daysix: data[i][thead[6]],
                dayseven: data[i][thead[7]],
                daydayone: data[i][thead[8]],
                daydaytwo: data[i][thead[9]],
                daydaythree: data[i][thead[10]],
                daydayfour: data[i][thead[11]],
                classnum: data[i][thead[12]]
            });
        }

        const res = await ctx.service.course.import(result);
        // console.log(res)
        if(res){
            ctx.body={data:'导入成功！'}
        }else{
            ctx.body={data:'导入失败！'}
        }
    }
}

module.exports = Controller;
